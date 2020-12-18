#include "Common.h"

int * Common::convertTo8bit(float * arr, int size)
{
	int* intArr = (int*)malloc(size*sizeof(int));
	for (int i = 0; i < size; i++) {
		intArr[i] = arr[i] * 255;
	}
	return intArr;
}