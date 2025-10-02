import 'package:flutter/material.dart';
import '../models/alert.dart';
import '../services/lan_service.dart';
import '../widgets/alert_card.dart';

class CitoyenHome extends StatefulWidget {
  const CitoyenHome({super.key});

  @override
  State<CitoyenHome> createState() => _CitoyenHomeState();
}

class _CitoyenHomeState extends State<CitoyenHome> {
  final _lanService = LanService(baseUrl: "http://10.0.2.2:3000/api");
  final List<Alert> _alerts = [];

  @override
  void initState() {
    super.initState();
    _lanService.startUdp();

    _lanService.realtimeAlerts.listen((alert) {
      setState(() {
        _alerts.insert(0, alert); // ajouter en haut
      });
    });
  }

  void _sendToOperator(Alert alert) async {
    await _lanService.sendAlertToBackend(alert);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("✅ Alerte envoyée à l’opérateur")),
    );
  }

  void _deleteAlert(Alert alert) {
    setState(() {
      _alerts.removeWhere((a) => a.id == alert.id);
    });
  }

 void _showDetail(Alert alert) {
  showDialog(
    context: context,
    builder: (_) => AlertDialog(
      title: const Text("Détails de l'alerte"),
      content: SizedBox(
        width: 300,
        child: () {
          if (alert.type == "image" && alert.data is String) {
            return Image.network(alert.data,
                fit: BoxFit.contain, errorBuilder: (_, __, ___) {
              return const Text("❌ Impossible de charger l'image");
            });
          } else if (alert.type == "video") {
            return const Icon(Icons.videocam, size: 100);
          } else {
            return Text(alert.data.toString());
          }
        }(),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text("Fermer"),
        ),
      ],
    ),
  );
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Accueil Citoyen")),
      body: _alerts.isEmpty
          ? const Center(child: Text("Aucune alerte pour le moment."))
          : ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: _alerts.length,
              itemBuilder: (context, i) {
                final alert = _alerts[i];
                return AlertCard(
                  alert: alert,
                  onDetail: () => _showDetail(alert),
                  onDelete: () => _deleteAlert(alert),
                  onSendToOperator: () => _sendToOperator(alert),
                );
              },
            ),
    );
  }
}
