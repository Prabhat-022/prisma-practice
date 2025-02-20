import prisma from "../client.js";

// Creating a user
export async function createUser(req, res) {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });

    res.status(201).json({
      status: true,
      message: "User Successfully Created",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}

// Get all Users
export async function getUsers(req, res) {
  const users = await prisma.user.findMany();

  res.json({
    status: true,
    message: "Users Successfully fetched",
    data: users,
  });
}

// In the preceding code, the getUsers controller gets all users.

//### getUser controller
//The getUser controller handles GET requests for a single user.

// Enter the following in the `user.route.ts` file.


// Get a single user
export async function getUser(req, res) {
  const { userid } = req.params;
  const user = await prisma.user.findFirst({
    where: {
      id: userid,
    },
  });

  res.json({
    status: true,
    message: "User Successfully fetched",
    data: user,
  });
}

// deleting a user
export async function deleteUser(req, res) {
  const { userid } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userid,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }
    await prisma.user.delete({
      where: {
        id: userid,
      },
    }),
      res.json({
        status: true,
        message: "User Successfully deleted",
      });
  } catch {
    res.status(501).json({
      status: false,
      message: "server error",
    });
  }
}

// updating a single user
export async function updateUser(req, res) {
  try {
    const { userid } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        id: userid,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userid,
      },
      data: req.body,
    });

    res.json({
      status: true,
      message: "User Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "server error",
    });
  }
}
