class DashBoardPage {
  constructor(page) {
    this.page = page;
    this.userFullName = page.locator('h6.MuiTypography-subtitle2');
    this.userRole = page.locator('a p.MuiTypography-body2');

    this.profileMenu = page.locator('header button').last();
    this.profileIcon = page.locator('header button').last();
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
  }

  async openProfileMenu() {
  await this.profileMenu.waitFor({ state: 'visible' });
  await this.profileMenu.click();
}

async clickProfileIcon() {
    await this.profileIcon.click();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

}

module.exports = DashBoardPage;