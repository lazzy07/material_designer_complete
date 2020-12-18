#pragma once
#include "PerlinNoise.h"

void PerlinNoise::perlinNoise2d(int nWidth, int nHeight, float *fSeed, int nOctaves, float fBias, float *fOutput)
{
	if (nOctaves > 8) {
		nOctaves = 8;
	}
	if (nOctaves < 0) {
		nOctaves = 1;
	}
	if (fBias <= 0.1) {
		fBias = 0.1;
	}
	// Used 1D Perlin Noise
	for (int x = 0; x < nWidth; x++)
		for (int y = 0; y < nHeight; y++)
		{
			float fNoise = 0.0f;
			float fScaleAcc = 0.0f;
			float fScale = 1.0f;

			for (int o = 0; o < nOctaves; o++)
			{
				int nPitch = nWidth >> o;
				int nSampleX1 = (x / nPitch) * nPitch;
				int nSampleY1 = (y / nPitch) * nPitch;

				int nSampleX2 = (nSampleX1 + nPitch) % nWidth;
				int nSampleY2 = (nSampleY1 + nPitch) % nWidth;

				float fBlendX = (float)(x - nSampleX1) / (float)nPitch;
				float fBlendY = (float)(y - nSampleY1) / (float)nPitch;

				float fSampleT = (1.0f - fBlendX) * fSeed[nSampleY1 * nWidth + nSampleX1] + fBlendX * fSeed[nSampleY1 * nWidth + nSampleX2];
				float fSampleB = (1.0f - fBlendX) * fSeed[nSampleY2 * nWidth + nSampleX1] + fBlendX * fSeed[nSampleY2 * nWidth + nSampleX2];

				fScaleAcc += fScale;
				fNoise += (fBlendY * (fSampleB - fSampleT) + fSampleT) * fScale;
				fScale = fScale / fBias;
			}

			// Scale to seed range
			fOutput[y * nWidth + x] = fNoise / fScaleAcc;
		}
};

cv::Mat PerlinNoise::perlinNoise(int seed, int sizeX, int sizeY, int octaves, float bias)
{
	PsuedoRandom pr;
	int size = sizeX * sizeY;
	float* randomArr = (float*)malloc(size*sizeof(float));
	float* out = (float*)malloc(size*sizeof(float));
	pr.randomSeedGenerator(seed, size, randomArr);
	perlinNoise2d(sizeX, sizeY, randomArr, octaves, bias, out);
	cv::Mat fin(sizeX, sizeY, CV_32FC1, out);
	free(randomArr);
	return fin;
}
