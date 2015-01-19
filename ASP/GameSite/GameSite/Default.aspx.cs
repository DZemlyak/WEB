using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;

namespace GameSite
{
    public partial class _Default : Page
    {
        private const string cookieName = "userName";
        private const string hostName = "hostUser";


        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                if (Request[cookieName] == null) return;
                Session.Add("userName", Request[cookieName]);
                Application.Add(Session["userName"].ToString(), new List<int>());
                ShowElements();
            }
        }

        protected void ButtonRegister_OnClick(object sender, EventArgs e)
        {
            var cookie = new HttpCookie(cookieName) {
                Value = UserName.Text,
                Expires = DateTime.Now.AddDays(1)
            };
            Response.Cookies.Add(cookie);
            Session.Add("userName", UserName.Text);
            ShowElements();
            Application.Add(Session["userName"].ToString(), new List<int>());
        }

        protected void ButtonLogOut_OnClick(object sender, EventArgs e)
        {
            var cookie = new HttpCookie(cookieName) {
                Expires = DateTime.Now.AddDays(-1)
            };
            Response.Cookies.Add(cookie);
            Session.Remove("userName");
            HideElement();
        }

        protected void StartGamePanel_OnPreRender(object sender, EventArgs e)
        {
            if (Application["winner"] != null) {
                gameStatus.Text = "Game over. User \"" + Application["winner"] +
                    "\" is a winner. \n The Number was " + Application["secretNumber"] + " Start new game!";
                return;
            }
            if (Application[hostName] != null)
                gameStatus.Text = "User \"" + Application[hostName] 
                    + "\" started the game. Guess the Number! Or start new Game!";
            else
                gameStatus.Text = "The game hasn't started yet.";
        }

        private void ShowElements() {
            register.Visible = false;
            logOut.Visible = true;
            StartGamePanel.Visible = true;
            GameInputPanel.Visible = true;
        }

        private void HideElement() {
            register.Visible = true;
            logOut.Visible = false;
            StartGamePanel.Visible = false;
            GameInputPanel.Visible = false;
        }

        protected void ButtonStartGame_OnClick(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(TextBoxNumber.Text) || !Regex.IsMatch(TextBoxNumber.Text, @"^-?\d+$")) {
                LabelError1.Visible = true;
            }
            else {
                LabelError1.Visible = false;
                Application["winner"] = null;
                Application[hostName] = Session["userName"];
                Application["secretNumber"] = TextBoxNumber.Text;
            }
        }

        protected void ButtonGuess_OnClick(object sender, EventArgs e)
        {
            if (Application[hostName] == Session["userName"]) {
                Result.Text = "You can't play the game!";
                return;
            }
            if (Application["secretNumber"] == null || Application["winner"] != null) return;
            if (string.IsNullOrEmpty(TextBoxNumberGuess.Text) 
                || !Regex.IsMatch(TextBoxNumberGuess.Text, @"^-?\d+$")) {
                LabelError2.Visible = true;
                return;
            }
            LabelError2.Visible = false;

            var secretNumber = Int32.Parse(Application["secretNumber"].ToString());
            var number = Int32.Parse(TextBoxNumberGuess.Text);

            ((List<int>)Application[Session["userName"].ToString()]).Add(number);

            if (secretNumber == number) {
                Application["winner"] = Session["userName"];
                Result.Text = String.Empty;
            }
            else if (number > secretNumber) {
                Result.Text = "Your number is greater than needed one!";
            }
            else {
                Result.Text = "Your number is less than needed one!";
            }
        }

        protected void ButtonHistory_OnClick(object sender, EventArgs e)
        {
            LabelHistory.Text = "You typed this numbers: ";
            foreach (var value in (List<int>)Application[Session["userName"].ToString()]) {
                LabelHistory.Text += value + ", ";
            }
            LabelHistory.Text = LabelHistory.Text.Substring(0, LabelHistory.Text.Length - 2) + ".";
        }
    }
}