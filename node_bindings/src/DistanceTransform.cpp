#include "DistanceTransform.h"

cv::Mat DistanceTransform::distanceTransform(cv::Mat img, int retType, int distanceType, int maskSize, int labelType)
{
	cv::Mat imgc1, trans, label, labelc3, dst;
	cv::cvtColor(img, imgc1, cv::COLOR_BGR2GRAY);
	cv::distanceTransform(imgc1, trans, label, distanceType, maskSize, labelType);
	cv::normalize(trans, trans, 0, 1.0, cv::NORM_MINMAX);
	cv::normalize(label, label, 0, 1.0, cv::NORM_MINMAX);
	if (retType == 0) {
		trans.convertTo(dst, CV_8UC3, 255, 0);
		return dst;
	}
	else {
		label.convertTo(labelc3, CV_8UC3, 255, 0);
		return labelc3;
	}
}
