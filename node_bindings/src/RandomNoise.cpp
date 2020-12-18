#include "RandomNoise.h"

float * RandomNoise::generateFloatRandomNoise(int seed, int sizeX, int sizeY)
{
	float* arr = (float*)malloc(sizeof(float)*sizeX*sizeY);
	PsuedoRandom p;
	p.randomSeedGenerator(seed, sizeX*sizeY, arr);
	return arr;
}


cv::Mat RandomNoise::generate16bitRandomNoise(int seed, int sizeX, int sizeY)
{
	int size = sizeX*sizeY;
	float* a = generateFloatRandomNoise(seed, sizeX, sizeY);
	cv::Mat img(sizeX, sizeY, CV_32FC1, a);
	return img;
}