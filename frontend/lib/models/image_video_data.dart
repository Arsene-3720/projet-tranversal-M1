class ImageVideoData {
  final String type; // image ou video
  final String url;  // URL ou base64

  ImageVideoData({required this.type, required this.url});

  factory ImageVideoData.fromJson(Map<String, dynamic> json) {
    return ImageVideoData(
      type: json['type'],
      url: json['url'],
    );
  }
}
