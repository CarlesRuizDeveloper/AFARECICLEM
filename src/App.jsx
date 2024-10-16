import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';  
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import BookDetail from './pages/BookDetails';
import ChatList from './pages/ChatList';
import ChatPage from './pages/ChatPage';




function App() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Header />
      <main className="flex-grow"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/llibre/:id" element={<BookDetail />} />
          <Route path="/chats" element={<ChatList />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </main>
      <Footer /> 
    </div>
  );
}

export default App;
