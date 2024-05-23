const { prisma } = require("../data/prisma");
const userExists = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};

module.exports = { userExists };
