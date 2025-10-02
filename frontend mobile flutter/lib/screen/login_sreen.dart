import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/api_service.dart';
import 'register_screen.dart';

class LoginScreen extends StatefulWidget {
  final String role;
  const LoginScreen({super.key, required this.role});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _loading = false;

  void _login() async {
    setState(() => _loading = true);
    try {
      final res = await ApiService.login(
        _emailController.text,
        _passwordController.text,
      );

      final token = res['token'];
      final role = res['user']['role'];

      // Sauvegarder le token
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', token);

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Connecté en tant que $role')),
      );

      // Redirection selon le rôle
      if (role == "admin") {
        Navigator.pushReplacementNamed(context, '/adminHome');
      } else if (role == "citoyen") {
        Navigator.pushReplacementNamed(context, '/citoyen_home');
      } else if (role == "policier") {
        Navigator.pushReplacementNamed(context, '/policierHome');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString())),
      );
    } finally {
      setState(() => _loading = false);
    }
  }

  String? _validateEmail(String? v) {
    if (v == null || v.isEmpty) return 'Email requis';
    final regex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    if (!regex.hasMatch(v)) return 'Email invalide';
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login ${widget.role}')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(labelText: 'Mot de passe'),
              obscureText: true,
            ),
            const SizedBox(height: 20),
            _loading
                ? const CircularProgressIndicator()
                : ElevatedButton(onPressed: _login, child: const Text('Se connecter')),
            TextButton(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => RegisterScreen(role: widget.role)));
              },
              child: const Text('S’inscrire'),
            )
          ],
        ),
      ),
    );
  }
}
