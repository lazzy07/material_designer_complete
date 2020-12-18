#include <stdlib.h>
#include "PsuedoRandom.h"

void PsuedoRandom::randomSeedGenerator(int seed, int size, float * res)
{
	if (seed < 1) {
		seed = 1;
	}
	srand(seed);
	for (int i = 0; i < size; i++) {
		res[i] = (float) rand() / RAND_MAX;
	}
}
