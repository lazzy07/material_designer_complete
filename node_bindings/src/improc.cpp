#include <nan.h>
#include "RandomNoiseNode.h"
#include "PerlinNoiseNode.h"
#include "BlendNode.h"
#include "SplitColorNode.h"
#include "MergeColorNode.h"
#include "ThresholdNode.h"
#include "BlurNode.h"
#include "DistanceTransformNode.h"
#include "HighpassNode.h"
#include "ColorToGrayscaleNode.h"
#include "InvertNode.h"
#include "GammaCorrectionNode.h"
#include "MorphologyNode.h"
#include "ColorizeNode.h"

NAN_MODULE_INIT(Initialize)
{
	RandomNoiseNode::Init(target);
	PerlinNoiseNode::Init(target);
	BlendNode::Init(target);
	SplitColorNode::Init(target);
	MergeColorNode::Init(target);
	ThresholdNode::Init(target);
	BlurNode::Init(target);
	DistanceTransformNode::Init(target);
	HighpassNode::Init(target);
	ColorToGrayscaleNode::Init(target);
	InvertNode::Init(target);
	GammaCorrectionNode::Init(target);
	MorphologyNode::Init(target);
	ColorizeNode::Init(target);
}

NODE_MODULE(addon, Initialize);