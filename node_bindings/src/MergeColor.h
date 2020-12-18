#pragma once
#include <opencv2\imgproc.hpp>

class MergeColor {
public:
	cv::Mat mergeColor(cv::Mat r, cv::Mat g, cv::Mat b);
};