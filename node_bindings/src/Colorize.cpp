#include "Colorize.h"

cv::Mat Colorize::colorize(cv::Mat img, cv::Mat lut) {
	cv::Mat dst;
	cv::LUT(img, lut, dst);
	//cv::applyColorMap(img, dst, cv::COLORMAP_HOT);
	return dst;
}