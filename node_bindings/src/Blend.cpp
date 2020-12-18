#include "Blend.h"

cv::Mat Blend::addImage(cv::Mat img1, cv::Mat img2, float alpha)
{
	float beta = 1.0 - alpha;
	cv::Mat dst;

	cv::addWeighted(img1, alpha, img2, beta, 0.0, dst, CV_8SC3);
	return dst;
}

cv::Mat Blend::substractImage(cv::Mat img1, cv::Mat img2, float alpha)
{
	float beta = 1.0 - alpha;
	return alpha*img1 - beta*img2;
}

cv::Mat Blend::multiplyImage(cv::Mat img1, cv::Mat img2, float alpha) {
	img1.convertTo(img1, CV_32FC3, 1.0 / 255);
	img2.convertTo(img2, CV_32FC3, 1.0 / 255);
	cv::Mat ouImage = cv::Mat::zeros(img1.size(), img1.type());
	cv::Mat ouImage0 = cv::Mat::zeros(img1.size(), img1.type());

	cv::multiply(img2, alpha, ouImage0);
	cv::multiply(img1, ouImage0, ouImage);
	cv::Mat out;
	ouImage.convertTo(out, CV_8UC3, 255, 0);
	ouImage.release();
	ouImage0.release();
	return out;
}

cv::Mat Blend::divideImage(cv::Mat img1, cv::Mat img2, float alpha) {
	img1.convertTo(img1, CV_32FC3, 1.0 / 255);
	img2.convertTo(img2, CV_32FC3, 1.0 / 255);
	cv::Mat ouImage = cv::Mat::zeros(img1.size(), img1.type());
	cv::Mat ouImage0 = cv::Mat::zeros(img1.size(), img1.type());

	cv::multiply(img2, alpha, ouImage0);
	cv::divide(img1, ouImage0, ouImage);
	cv::Mat out;
	ouImage.convertTo(out, CV_8UC3, 255, 0);
	ouImage.release();
	ouImage0.release();
	return out;
}


