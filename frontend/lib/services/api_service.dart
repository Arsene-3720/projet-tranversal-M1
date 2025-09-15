import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "http://10.0.2.2:3000/api"; // Android Emulator

  static Future<Map<String, dynamic>> register(String role, String nom, String email, String password) async {
    final res = await http.post(
      Uri.parse("$baseUrl/register"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"role": role, "nom": nom, "email": email, "password": password}),
    );

    if (res.statusCode == 201) {
      return jsonDecode(res.body);
    } else {
      final body = jsonDecode(res.body);
      throw Exception(body['error'] ?? "Erreur serveur");
    }
  }

  static Future<Map<String, dynamic>> login(String email, String password) async {
    final res = await http.post(
      Uri.parse("$baseUrl/login"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"email": email, "password": password}),
    );

    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    } else {
      final body = jsonDecode(res.body);
      throw Exception(body['error'] ?? "Erreur serveur");
    }
  }
}
