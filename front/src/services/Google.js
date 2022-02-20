// export function renderAuthButton(state) {
//     //this is just helper method for user login status
//     if (this.state.isSignedIn === null) {
//         return <div className="ui text loader">WAIT A MOMENT </div>;
//     } else if (this.state.isSignedIn) {
//         return (
//             <div>
//                 <button className="g-button" onClick={this.onSignOutClick}>
//                     <img
//                         className="g-logo"
//                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/157px-Google_%22G%22_Logo.svg.png"
//                         alt="Google Logo"
//                     />
//                     <p className="g-text">Sign Out</p>
//                 </button>
//                 <br/>
//                 <h3>Hii {this.state.userGoodName}</h3>
//             </div>
//         );
//     } else {
//         return (
//             <div>
//                 <button className="g-button" onClick={this.onSignInClick}>
//                     <img
//                         className="g-logo"
//                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/157px-Google_%22G%22_Logo.svg.png"
//                         alt="Google Logo"
//                     />
//                     <p className="g-text">Sign in with Google</p>
//                 </button>
//                 <br/>
//                 <h3>Hii, If you click this button i will so you your name.</h3>
//             </div>
//         );
//     }
// }
// export function componentDidMount() {
//     window.gapi.load("client: auth2", () => {
//         window.gapi.client
//             .init({
//                 clientId:
//                     "403650961654-vdnsejt1smk0c91g2a8vja1751tutnni.apps.googleusercontent.com",
//                 scope: "email"
//             })
//             .then(() => {
//                 this.auth = window.gapi.auth2.getAuthInstance();
//
//                 this.setState({ isSignedIn: this.auth.isSignedIn.get() });
//                 console.log(this.state.isSignedIn);
//
//                 const userInitial = this.auth.currentUser.get().Qt.Ad;
//                 this.setState({ userGoodName: userInitial });
//                 console.log(this.state.userGoodName);
//
//                 this.auth.isSignedIn.listen(this.onAuthChange);
//             });
//     });
// }
//
// export function  onAuthChange  () {
//     this.setState({ isSignedIn: this.auth.isSignedIn.get() });
//     this.setState({ userGoodName: this.auth.currentUser.get() });
// }
//
// export function onSignInClick() {
//     this.auth.signIn();
// }
//
// export function onSignOutClick () {
//     this.auth.signOut();
// }