#pragma once
#include "MergeColor.h"
#include <nan.h>
#include <thread>
#include "ConvertImage.h"

class MergeColorNode {
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(MergeChannels);
};