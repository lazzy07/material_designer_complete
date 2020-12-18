#pragma once
#include "Blur.h"
#include <nan.h>
#include "ConvertImage.h"
class BlurNode {
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(BlurImage);
};