import { Request, Response } from 'express';
import mongoose from 'mongoose';
import os from 'os';

export const getHealthStatus = async (req: Request, res: Response): Promise<void> => {
	const memoryUsage = process.memoryUsage();
	const cpuLoad = os.loadavg();

	const healthStatus = {
		status: 'OK',
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
		memory: {
			rss: memoryUsage.rss,
			heapTotal: memoryUsage.heapTotal,
			heapUsed: memoryUsage.heapUsed,
		},
		cpu: {
			load1m: cpuLoad[0],
			load5m: cpuLoad[1],
			load15m: cpuLoad[2],
		},
		database: 'Unknown',
		environment: process.env.NODE_ENV || 'development',
	};

	try {
		if (mongoose.connection.readyState === 1) {
			healthStatus.database = 'Connected';
		} else {
			healthStatus.database = 'Disconnected';
		}
	} catch (error) {
		healthStatus.database = 'Error';
	}

	const statusCode = healthStatus.database === 'Connected' ? 200 : 500;

	res.status(statusCode).json(healthStatus);
};

export const getLiveness = (req: Request, res: Response): void => {
	res.status(200).json({ status: 'Live' });
};

export const getReadiness = async (req: Request, res: Response): Promise<void> => {
	const databaseStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
	const statusCode = databaseStatus === 'Connected' ? 200 : 500;

	res.status(statusCode).json({ status: 'Ready', database: databaseStatus });
};
