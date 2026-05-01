// users.js - XOS.GO User Storage (clean)
(function(){
  const KEY = 'xosgo_user';

  const XDB = {
    get() {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    },
    set(user) {
      localStorage.setItem(KEY, JSON.stringify(user));
      return user;
    },
    update(updates) {
      const u = this.get();
      if(!u) return null;
      Object.assign(u, updates);
      this.set(u);
      return u;
    },
    genOTP() {
      return Math.floor(1000 + Math.random() * 9000);
    },
    genStrongPassword() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
      let pw = '';
      for(let i=0; i<12; i++) pw += chars[Math.floor(Math.random() * chars.length)];
      return pw;
    },
    hashPassword(pw) {
      let hash = 0;
      for(let i= 0; i < pw.length; i++) hash = ((hash << 5) - hash) + pw.charCodeAt(i) | 0;
      return (hash + 0x7fffffff).toString(36);
    },
    encodePhone(phone) { return btoa(phone.split('').reverse().join('')); },
    encodeOTP(otp) {
      let enc = '';
      for(let i=0; i<otp.toString().length; i++) enc += String.fromCharCode(otp.toString().charCodeAt(i) ^ 0xAA);
      return btoa(enc);
    },
    addRide(ride) {
      const u = this.get();
      if(!u) return false;
      u.rides = u.rides || [];
      u.rides.unshift(ride);
      this.set(u);
      return true;
    },
    rateRide(idx, stars) {
      const u = this.get();
      if(!u || !u.rides || !u.rides[idx] || u.rides[idx].rated) return false;
      u.rides[idx].rated = true;
      u.rides[idx].rating = stars;
      this.set(u);
      return true;
    },
    hasUnreadNotifs(notifs) {
      const u = this.get();
      if(!u || !u.follow) return false;
      const read = u.readNotifs || [];
      return notifs.some(n => !read.includes(n.id));
    },
    markNotifsRead(ids) {
      const u = this.get();
      if(!u) return;
      const read = u.readNotifs || [];
      ids.forEach(id => { if(!read.includes(id)) read.push(id); });
      u.readNotifs = read;
      this.set(u);
    },
    isBookingLocked() {
      const u = this.get();
      return u && u.lockUntil && u.lockUntil > Date.now();
    },
    setBookingLock(ms = 30000) {
      const u = this.get();
      if(u) { u.lockUntil = Date.now() + ms; this.set(u); }
    },
    toggleFollow() {
      const u = this.get();
      if(!u) return false;
      u.follow = u.follow ? 0 : 1;
      this.set(u);
      return !!u.follow;
    }
  };
  window.XDB = XDB;
})();
