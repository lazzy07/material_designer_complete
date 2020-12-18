#pragma once
#include <opencv2\imgproc.hpp>
#include "PsuedoRandom.h"
#include "Common.h"

class RandomNoise {
public:
	float* generateFloatRandomNoise(int seed, int sizeX, int sizeY);
	cv::Mat generate16bitRandomNoise(int seed, int sizeX, int sizeY);
};