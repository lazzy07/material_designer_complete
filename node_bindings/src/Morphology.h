#pragma once
#include <opencv2\imgproc.hpp>

class Morphology {
public:
	cv::Mat morphology(cv::Mat img, int operation, int kernel, int morph_size, int iterations);
};