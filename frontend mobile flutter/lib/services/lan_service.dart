  import 'dart:async';
  import 'dart:convert';
  import 'dart:io';
  import 'package:http/http.dart' as http;

  import '../models/alert.dart';

  class LanService {
    final String baseUrl;
    final int udpPort;

    RawDatagramSocket? _socket;
    final StreamController<Alert> _realtimeCtl = StreamController.broadcast();

    LanService({required this.baseUrl, this.udpPort = 9000});

    Stream<Alert> get realtimeAlerts => _realtimeCtl.stream;

    /// Version de diagnostic avec logs détaillés
    Future<void> startUdp() async {
  try {
    print("🚀 Tentative de démarrage UDP sur port $udpPort");

    // Bind du socket UDP
    _socket = await RawDatagramSocket.bind(InternetAddress.anyIPv4, udpPort);
    _socket!.broadcastEnabled = true;

    print("✅ Socket UDP créé avec succès");
    print("🔍 Interface: ${_socket!.address}:${_socket!.port}");
    print("📡 Broadcast activé: ${_socket!.broadcastEnabled}");

    // Informations réseau détaillées
    await _printNetworkInfo();

    // Écoute des paquets UDP
    _socket!.listen((RawSocketEvent e) {
      print("🎯 Événement socket reçu: $e");

      if (e == RawSocketEvent.read) {
        final dg = _socket!.receive();
        if (dg == null) {
          print("⚠️ Datagram null reçu");
          return;
        }

        try {
          final text = utf8.decode(dg.data);
          print("📩 PAQUET UDP REÇU !");
          print("   📍 Source: ${dg.address}:${dg.port}");
          print("   📏 Taille: ${dg.data.length} bytes");
          print("   📄 Contenu brut: $text");

          final map = jsonDecode(text) as Map<String, dynamic>;
          final alert = Alert.fromJson(map);
          print("✅ Alerte parsée avec succès: ${alert.id} (type: ${alert.type})");

          _realtimeCtl.add(alert);
        } catch (err) {
          print("❌ Erreur parsing UDP: $err");
          print("   📄 Contenu problématique: ${utf8.decode(dg.data)}");
        }
      }
    }, onError: (error) {
      print("❌ Erreur socket UDP: $error");
    }, onDone: () {
      print("ℹ️ Socket UDP fermé");
    });

    // **Plus de self-test automatique**
  } catch (err) {
    print("💥 ERREUR CRITIQUE démarrage UDP: $err");
    print("   Type d'erreur: ${err.runtimeType}");
  }
}

    /// Affiche les informations réseau
    Future<void> _printNetworkInfo() async {
      try {
        print("🌐 === INFORMATIONS RÉSEAU ===");
        
        final interfaces = await NetworkInterface.list();
        for (final interface in interfaces) {
          print("🔌 Interface: ${interface.name}");
          for (final addr in interface.addresses) {
            print("   📍 IP: ${addr.address} (${addr.type})");
          }
        }
        
        print("🎯 Port d'écoute UDP: $udpPort");
        print("================================");
      } catch (e) {
        print("❌ Erreur info réseau: $e");
      }
    }

    /// Test d'auto-envoi pour vérifier que le socket fonctionne
    Future<void> _sendSelfTest() async {
      try {
        print("🧪 Test d'auto-envoi...");
        
        final testSocket = await RawDatagramSocket.bind(InternetAddress.anyIPv4, 0);
        testSocket.broadcastEnabled = true;
        
        final testData = jsonEncode({
          "id": "self-test-${DateTime.now().millisecondsSinceEpoch}",
          "type": "test",
          "data": "Test de connexion locale",
          "sendToOperator": false,
          "sentToPolice": false
        });
        
        final message = utf8.encode(testData);
        
        // Essayez plusieurs adresses
        final testAddresses = [
          "127.0.0.1",      // localhost
          "10.0.2.15",      // émulateur self
          "255.255.255.255" // broadcast global
        ];
        
        for (final addr in testAddresses) {
          try {
            final sent = testSocket.send(message, InternetAddress(addr), udpPort);
            print("📤 Test envoyé vers $addr:$udpPort - Bytes: $sent");
          } catch (e) {
            print("❌ Erreur envoi vers $addr: $e");
          }
        }
        
        testSocket.close();
        
      } catch (e) {
        print("❌ Erreur self-test: $e");
      }
    }

    Future<void> sendAlertToBackend(Alert alert) async {
      try {
        print("🚀 Envoi alerte vers backend: $baseUrl");
        final uri = Uri.parse('$baseUrl/alerts');
        final res = await http.post(
          uri,
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode(alert.toJson()),
        ).timeout(Duration(seconds: 10));

        if (res.statusCode == 201) {
          print("✅ Alerte sauvegardée côté serveur");
        } else {
          print("❌ Erreur sauvegarde: ${res.statusCode} - ${res.body}");
        }
      } catch (e) {
        print("💥 Erreur connexion backend: $e");
      }
    }

    Future<void> stopUdp() async {
      print("🛑 Arrêt du service UDP...");
      _socket?.close();
      _socket = null;
    }

    void dispose() {
      stopUdp();
      _realtimeCtl.close();
      print("🧹 LanService disposé");
    }
  }