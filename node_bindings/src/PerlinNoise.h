#pragma once
#include <opencv2\imgproc.hpp>
#include "PsuedoRandom.h"
#include "Common.h"

class PerlinNoise {
public:
	void perlinNoise2d(int nWidth, int nHeight, float *fSeed, int nOctaves, float fBias, float *fOutput);
	cv::Mat perlinNoise(int seed, int sizeX, int sizeY, int octaves, float bias);
};