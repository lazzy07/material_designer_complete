#pragma once
#include "Blend.h"
#include <nan.h>
#include <thread>
#include "ConvertImage.h"

class BlendNode {
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(Arithmetic);
};
