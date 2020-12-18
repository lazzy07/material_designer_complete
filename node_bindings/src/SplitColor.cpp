#include "SplitColor.h"

void SplitColor::splitColor(cv::Mat img, cv::Mat* arr) {
	cv::split(img, arr);
}