module.exports = () => {
  const checkPermissions = (req, res, next, allowedPermissions) => {
    let userPermissions = req.user.rolesAndPermissions;
    allowedPermissions.forEach((allowedData) => {
      let strikeRate = 0;
      for (let i = 0; i < userPermissions.length; i++) {
        if (userPermissions[i] === allowedData) strikeRate = strikeRate + 1;
      }
      if (!strikeRate) {
        res.status(401);
        return res.json({ statusCode: 401, message: 'Unauthorized Access' });
      }
    });
    next();
  };

  return { checkPermissions };
};
