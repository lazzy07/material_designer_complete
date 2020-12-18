#include "Threshold.h"

cv::Mat Threshold::threshold(cv::Mat img, int threshVal, int maxVal, int threshType, int kernel, float substract)
{
	cv::Mat gray, dst;
	cv::cvtColor(img, gray, cv::COLOR_BGR2GRAY);
	if (threshType < 5) {
		cv::threshold(img, dst, threshVal, maxVal, threshType);
		return dst;
	}
	else {
		if (kernel < 3) {
			kernel = 3;
		}
		else {
			if (kernel % 2 == 0) {
				kernel = kernel - 1;
			}
		}
		if (threshType == 5) {
			cv::Mat g;
			cv::adaptiveThreshold(gray, g, maxVal, cv::ADAPTIVE_THRESH_GAUSSIAN_C, cv::THRESH_BINARY, kernel, substract);
			cv::cvtColor(g, dst, cv::COLOR_GRAY2BGR);
			return dst;
		}
		else {
			cv::Mat g;
			cv::adaptiveThreshold(gray, g, maxVal, cv::ADAPTIVE_THRESH_MEAN_C, cv::THRESH_BINARY, kernel, substract);
			cv::cvtColor(g, dst, cv::COLOR_GRAY2BGR);
			return dst;
		}
	}
}
