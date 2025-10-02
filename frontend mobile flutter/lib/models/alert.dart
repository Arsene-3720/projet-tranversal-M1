// lib/models/alert.dart
class Alert {
  final String id;
  final String type;          // ex: "image", "video", "stat"
  final dynamic data;         // contenu (base64, texte, etc.)
  final bool sendToOperator;  // si true, bouton "Envoyer à la police" dispo
  final bool sentToPolice;    // si déjà envoyé à la police

  Alert({
    required this.id,
    required this.type,
    required this.data,
    required this.sendToOperator,
    this.sentToPolice = false,
  });

  /// Factory pour transformer JSON → objet
  factory Alert.fromJson(Map<String, dynamic> json) {
    return Alert(
      id: json['id']?.toString() ?? '',
      type: json['type'] ?? 'unknown',
      data: json['data'],
      sendToOperator: json['sendToOperator'] ?? false,
      sentToPolice: json['sentToPolice'] ?? false,
    );
  }

  /// Transformer objet → JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'type': type,
      'data': data,
      'sendToOperator': sendToOperator,
      'sentToPolice': sentToPolice,
    };
  }

  /// Permet de cloner et modifier facilement l’objet
  Alert copyWith({
    String? id,
    String? type,
    dynamic data,
    bool? sendToOperator,
    bool? sentToPolice,
  }) {
    return Alert(
      id: id ?? this.id,
      type: type ?? this.type,
      data: data ?? this.data,
      sendToOperator: sendToOperator ?? this.sendToOperator,
      sentToPolice: sentToPolice ?? this.sentToPolice,
    );
  }
}
