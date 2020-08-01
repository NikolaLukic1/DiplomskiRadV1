using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager){
            if(!userManager.Users.Any()){
                var user = new AppUser {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address{
                        FirstName = "Bob",
                        LastName = "Bobbity",
                        Street = "10 The Street",
                        City = "New York",
                        State = "NY",
                        Zipcode = "90210"
                    },
                    Role = "Administrator"
                };
            
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await roleManager.CreateAsync(new IdentityRole(user.Role));
            await roleManager.CreateAsync(new IdentityRole("Customer"));
            await userManager.AddToRoleAsync(user, user.Role);
            }
        }

        
    }
}