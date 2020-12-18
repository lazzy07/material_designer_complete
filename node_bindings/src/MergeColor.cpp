#include "MergeColor.h"

cv::Mat MergeColor::mergeColor(cv::Mat r, cv::Mat g, cv::Mat b)
{
	cv::Mat res;
	std::vector<cv::Mat> channels;
	channels.push_back(b);
	channels.push_back(g);
	channels.push_back(r);
	cv::merge(channels, res);
	return res;
}
