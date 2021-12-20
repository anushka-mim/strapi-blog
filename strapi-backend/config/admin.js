module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '25ac68fdff97b16aaaf7ece500de3d11'),
  },
});
