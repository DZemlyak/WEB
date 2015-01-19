<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" EnableEventValidation="false"
    AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="GameSite._Default" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <div class="float-right game-name">
        <h2>Guess the number game!</h2>
    </div>
    <div class="clear-fix"></div>

    <asp:UpdatePanel runat="server" ID="RegistrationPanel" UpdateMode="Conditional" ChildrenAsTriggers="False">
        <Triggers>
            <asp:AsyncPostBackTrigger ControlID="ButtonRegister"/>
            <asp:AsyncPostBackTrigger ControlID="ButtonLogOut"/>
        </Triggers>
        <ContentTemplate>
            
            <div class="content-wrapper">
                <div class="float-left">
                    <section id="register" runat="server">
                        <asp:TextBox runat="server" ID="UserName"></asp:TextBox>
                        <asp:Button runat="server" ID="ButtonRegister" Text="Register" OnClick="ButtonRegister_OnClick"/>
                        <asp:RequiredFieldValidator runat="server" ControlToValidate="UserName" 
                            CssClass="field-validation-error" >
                            Type your name!
                        </asp:RequiredFieldValidator>
                    </section>
                </div>
                <div class="float-right">
                    <section id="logOut" runat="server" Visible="False">
                        <span>
                            Hello, <%= Session["userName"].ToString() %>!
                        </span>
                        <asp:Button runat="server" ID="ButtonLogOut" Text="Log Out" OnClick="ButtonLogOut_OnClick"/>
                    </section>
                </div>
            </div>
            
            <div class="clear-fix"></div>
            <div class="content-wrapper">
                
                <asp:UpdatePanel runat="server" ID="StartGamePanel" Visible="False"
                     OnPreRender="StartGamePanel_OnPreRender">
                    <Triggers>
                        <asp:AsyncPostBackTrigger  ControlID="Timer1" />
                    </Triggers>
                    <ContentTemplate>
                        <asp:Label runat="server" ID="gameStatus"></asp:Label>
                    </ContentTemplate>
                </asp:UpdatePanel>
                
                <asp:UpdatePanel runat="server" ID="GameInputPanel" Visible="False" UpdateMode="Conditional">
                    <Triggers>
                        <asp:AsyncPostBackTrigger  ControlID="ButtonStartGame" />
                        <asp:AsyncPostBackTrigger  ControlID="ButtonGuess" />
                    </Triggers>
                    <ContentTemplate>
                        <section runat="server">
                            <br/>
                            <br/>
                            <asp:Label runat="server" Text="Type the number: "></asp:Label>
                            <asp:TextBox runat="server" ID="TextBoxNumber"></asp:TextBox>
                            <asp:Button runat="server" ID="ButtonStartGame" Text="Start new Game" OnClick="ButtonStartGame_OnClick"/>
                            <asp:Label runat="server" CssClass="field-validation-error" Visible="False"
                                ID="LabelError1" Text="Type the number!"></asp:Label>
                            <br/>
                            <asp:Label runat="server" Text="Type the number: "></asp:Label>
                            <asp:TextBox runat="server" ID="TextBoxNumberGuess"></asp:TextBox>
                            <asp:Button runat="server" ID="ButtonGuess" Text="Try Number" OnClick="ButtonGuess_OnClick"/>
                            <asp:Label runat="server" CssClass="field-validation-error" Visible="False"
                                ID="LabelError2" Text="Type the number!"></asp:Label>
                            <div class="clear-fix"></div>
                            <asp:Label runat="server" ID="Result"></asp:Label>
                            <div class="clear-fix"></div>
                            <asp:Button runat="server" ID="ButtonHistory" Text="My History" OnClick="ButtonHistory_OnClick"/>
                            <asp:Label runat="server" ID="LabelHistory"></asp:Label>
                        </section>
                    </ContentTemplate>
                </asp:UpdatePanel>
            </div>
            <asp:Timer runat="server" ID="Timer1" Interval="1000"></asp:Timer>
            
        </ContentTemplate>
    </asp:UpdatePanel>
 
</asp:Content>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent1">

</asp:Content>

