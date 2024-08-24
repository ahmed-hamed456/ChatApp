using Microsoft.EntityFrameworkCore;
using SignalRDemo.Models;

namespace SignalRDemo.Context
{
    public class ChatDbContext : DbContext
    {
        public ChatDbContext(DbContextOptions<ChatDbContext> options) 
            :base(options) 
        {
                
        }

       public DbSet<Message> Messages { get; set; }
    }
}
