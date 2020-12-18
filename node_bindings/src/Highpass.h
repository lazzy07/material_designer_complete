#pragma once
#include <opencv2\imgproc.hpp>

class Highpass {
public:
	cv::Mat highpass(cv::Mat img, int type, int dx, int dy, int ksize, float delta);
};