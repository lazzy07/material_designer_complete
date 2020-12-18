#pragma once
#include <nan.h>
#include "SplitColor.h"
#include <iostream>
#include "ConvertImage.h"

class SplitColorNode {
public:
	static NAN_MODULE_INIT(Init);
	static NAN_METHOD(SplitColors);
};