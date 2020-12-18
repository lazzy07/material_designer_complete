#pragma once
#include <nan.h>
#include "ConvertImage.h"
#include "PerlinNoise.h"

class PerlinNoiseNode {
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(GeneratePerlinNoise);
};