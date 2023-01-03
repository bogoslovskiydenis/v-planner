export default class UserService {

  static async login(email, password) {
    const user = {
      role: process.env.REACT_APP_ROLE_USER,
      profile: {
        email: "main.profile.mail@gmail.com",
        firstName: "Denis",
        lastName: "Bogoslovskiy",
        phone: 380938328305,
        avatar: "https://avatars.githubusercontent.com/u/46006619?s=400&u=3e76ffd1ed264b8a699871c7e00df8ca51aafa6e&v=4",
        nickname: "Den",
        partnersFirstName: "Partner First Name",
        partnersLastName: "Partner Last Name",
        likes: {
          users: {
            1: true,
            // 2: true,
            // 3: true,
            // 4: true,
            // 5: true,
            // 6: true,
            // 7: true,
            // 8: true,
            // 9: true,
            // 10: true
            // 1 - ид юзера
          },
          total: 7
        }
      },
      wedding: {
        engagementDate: "05/27/2022",
        weddingDate: "05/28/2022",
        location: "new-yourk",
        countGuest: 547,
        budget: "Budget"
      }
    }


    return {
      data: {
        accessToken: JSON.stringify(user),
        refreshToken: "refresh",
        user
      }
    }
  }
  
}