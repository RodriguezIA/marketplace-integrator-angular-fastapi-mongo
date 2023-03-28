import 'package:flutter/material.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[300],
        body: SafeArea(
            child: Center(
                child: Column(children: const [
          SizedBox(height: 50),
          Icon(
            Icons.lock,
            size: 100,
          ),
          SizedBox(height: 50),
          Text(
            'Bienvenido de vuelta!!!',
            style:
                TextStyle(color: Color.fromARGB(255, 91, 91, 91), fontSize: 16),
          ),
          SizedBox(height: 25),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 25.0),
            child: TextField(
              decoration: InputDecoration(
                  enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.white)),
                  focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.grey.shade400))),
            ),
          )
        ]))));
  }
}
