#pragma once
#include <opencv2\imgproc.hpp>

class SplitColor {
public:
	void splitColor(cv::Mat img, cv::Mat* arr);
};
