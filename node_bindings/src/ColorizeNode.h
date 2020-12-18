#pragma once
#include "Colorize.h"
#include <nan.h>
#include "ConvertImage.h"

class ColorizeNode {
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(ColorizeImage);
};