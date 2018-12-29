package com.litlight;

import java.net.InetSocketAddress;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class WsServer extends WebSocketServer {
    public WsServer(int port) {
        super(new InetSocketAddress(port));
    }

    public WsServer(InetSocketAddress address) {
        super(address);
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {

    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        this.userLeave(conn);
        System.out.println(reason);
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        if (null != message && message.startsWith("online")) {
            String userName = message.replaceFirst("online", message);
            this.userJoin(conn, userName);
        } else if (null != message && message.startsWith("offline")) {
            this.userLeave(conn);
        }

    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        System.out.println("on error");
        ex.printStackTrace();
    }

    /**
     * 去除掉失效的web-socket
     *
     * @param conn A WebSocket connector
     */
    private void userLeave(WebSocket conn) {
        WsPool.removeUser(conn);
    }

    /**
     * 将web-socket加入用户池
     *
     * @param conn     A WebSocket connector
     * @param userName String
     */
    private void userJoin(WebSocket conn, String userName) {
        WsPool.addUser(userName, conn);
    }

    public static void main(String args[]) {
        int port = 8887;
        WsServer ws = new WsServer(port);
        ws.start();
    }
}


