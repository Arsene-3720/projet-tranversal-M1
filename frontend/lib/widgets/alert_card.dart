import 'package:flutter/material.dart';
import '../models/alert.dart';

class AlertCard extends StatelessWidget {
  final Alert alert;
  final VoidCallback onSendToOperator;
  final VoidCallback onDelete;
  final VoidCallback onDetail;

  const AlertCard({
    super.key,
    required this.alert,
    required this.onSendToOperator,
    required this.onDelete,
    required this.onDetail,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Type: ${alert.type}",
                style: const TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),

            // aperçu rapide
            if (alert.type == 'image' && alert.data is String)
              Image.network(alert.data, height: 120, fit: BoxFit.cover),
            if (alert.type == 'video')
              Container(
                height: 120,
                color: Colors.black12,
                child: const Center(child: Icon(Icons.videocam, size: 40)),
              ),
            if (alert.type == 'stat')
              Text("Donnée: ${alert.data}"),

            const SizedBox(height: 12),

            // les 3 boutons fixes
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton.icon(
                  onPressed: onDetail,
                  icon: const Icon(Icons.info),
                  label: const Text("Détail"),
                ),
                ElevatedButton.icon(
                  onPressed: onSendToOperator,
                  icon: const Icon(Icons.local_police),
                  label: const Text("Envoyer"),
                ),
                ElevatedButton.icon(
                  onPressed: onDelete,
                  icon: const Icon(Icons.delete),
                  label: const Text("Supprimer"),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
