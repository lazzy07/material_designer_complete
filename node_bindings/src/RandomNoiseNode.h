#pragma once
#include <nan.h>
#include "RandomNoise.h"
#include "ConvertImage.h"

class RandomNoiseNode{
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(RandomNoise);
};