#pragma once
#include "Highpass.h"
#include <nan.h>
#include <thread>
#include "ConvertImage.h"

class HighpassNode {
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(HighpassImage);
};