﻿// <auto-generated />
using System;
using Capstone.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Capstone.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Capstone.Models.Data.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StreetAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");

                    b.HasData(
                        new
                        {
                            Id = "00000000-ffff-ffff-ffff-ffffffffffff",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "8d227fd2-8240-4b03-8bc7-e1728f4bb798",
                            Email = "admin@admin.com",
                            EmailConfirmed = true,
                            FirstName = "admin",
                            LastName = "admin",
                            LockoutEnabled = false,
                            NormalizedEmail = "ADMIN@ADMIN.COM",
                            NormalizedUserName = "ADMIN@ADMIN.COM",
                            PasswordHash = "AQAAAAEAACcQAAAAEBZO9Gs3wF4TOiF5yT3Gejux44NyY9GDIqMCxWfnyy1JB2aNIJi3n0M4aJ6a5lrX8g==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "7f434309-a4d9-48e9-9ebb-8803db794577",
                            TwoFactorEnabled = false,
                            UserName = "admin@admin.com"
                        });
                });

            modelBuilder.Entity("Capstone.Models.Data.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ApplicationUserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("CompanyId");

                    b.ToTable("Comment");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ApplicationUserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            CompanyId = 1,
                            Text = "Some text for comments test"
                        },
                        new
                        {
                            Id = 2,
                            ApplicationUserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            CompanyId = 2,
                            Text = "Some text for comments test"
                        },
                        new
                        {
                            Id = 3,
                            ApplicationUserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            CompanyId = 3,
                            Text = "Some text for comments test"
                        });
                });

            modelBuilder.Entity("Capstone.Models.Data.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ApplicationUserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Founded")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Website")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ZipCode")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId");

                    b.ToTable("Company");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "1600 Amphitheatre Parkway",
                            ApplicationUserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            City = "Mountain View",
                            Country = "United States",
                            Founded = new DateTime(1998, 9, 4, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Google",
                            Website = "www.google.com",
                            ZipCode = 94043
                        },
                        new
                        {
                            Id = 2,
                            Address = "One Park Plaza",
                            ApplicationUserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            City = "Nashville",
                            Country = "United States",
                            Founded = new DateTime(1967, 6, 7, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "HCA",
                            Website = "www.hcahealtcare.com",
                            ZipCode = 37203
                        },
                        new
                        {
                            Id = 3,
                            Address = "410 Terry Ave N",
                            ApplicationUserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            City = "Seattle",
                            Country = "United States",
                            Founded = new DateTime(1995, 7, 5, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Amazon",
                            Website = "www.amazon.com",
                            ZipCode = 98109
                        });
                });

            modelBuilder.Entity("Capstone.Models.Data.CompanyType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<int>("IndustryTypeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("IndustryTypeId");

                    b.ToTable("CompanyType");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CompanyId = 1,
                            IndustryTypeId = 5
                        },
                        new
                        {
                            Id = 2,
                            CompanyId = 2,
                            IndustryTypeId = 12
                        },
                        new
                        {
                            Id = 3,
                            CompanyId = 2,
                            IndustryTypeId = 5
                        },
                        new
                        {
                            Id = 4,
                            CompanyId = 3,
                            IndustryTypeId = 5
                        },
                        new
                        {
                            Id = 5,
                            CompanyId = 3,
                            IndustryTypeId = 3
                        },
                        new
                        {
                            Id = 6,
                            CompanyId = 3,
                            IndustryTypeId = 10
                        });
                });

            modelBuilder.Entity("Capstone.Models.Data.IndustryType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Industry")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("IndustryType");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Industry = "Construction"
                        },
                        new
                        {
                            Id = 2,
                            Industry = "Hospitality"
                        },
                        new
                        {
                            Id = 3,
                            Industry = "Entertainment"
                        },
                        new
                        {
                            Id = 4,
                            Industry = "Manufacturing"
                        },
                        new
                        {
                            Id = 5,
                            Industry = "I.T."
                        },
                        new
                        {
                            Id = 6,
                            Industry = "Electronic"
                        },
                        new
                        {
                            Id = 7,
                            Industry = "Transport"
                        },
                        new
                        {
                            Id = 8,
                            Industry = "Pharmaceutical"
                        },
                        new
                        {
                            Id = 9,
                            Industry = "Energy"
                        },
                        new
                        {
                            Id = 10,
                            Industry = "Telecommunication"
                        },
                        new
                        {
                            Id = 11,
                            Industry = "Retail"
                        },
                        new
                        {
                            Id = 12,
                            Industry = "Healt Care"
                        });
                });

            modelBuilder.Entity("Capstone.Models.Data.Job", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ApplicationUserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JobPostUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("JobStatusId")
                        .HasColumnType("int");

                    b.Property<int>("Salary")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("JobStatusId");

                    b.ToTable("Job");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ApplicationUserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            CompanyId = 1,
                            Date = new DateTime(2020, 2, 5, 11, 28, 57, 951, DateTimeKind.Local).AddTicks(7257),
                            Description = "Be a good web developer",
                            JobPostUrl = "www.google.it/career",
                            JobStatusId = 1,
                            Salary = 0,
                            Title = ".Net Software Dev"
                        },
                        new
                        {
                            Id = 2,
                            ApplicationUserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            CompanyId = 2,
                            Date = new DateTime(2020, 2, 5, 11, 28, 57, 957, DateTimeKind.Local).AddTicks(6385),
                            Description = "Be a good software developer",
                            JobPostUrl = "www.HCA.it/career",
                            JobStatusId = 1,
                            Salary = 0,
                            Title = "Full-Stack software engigneer"
                        },
                        new
                        {
                            Id = 3,
                            ApplicationUserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            CompanyId = 3,
                            Date = new DateTime(2020, 2, 5, 11, 28, 57, 957, DateTimeKind.Local).AddTicks(6696),
                            Description = "Be a good React developer",
                            JobPostUrl = "www.amazon.it/career",
                            JobStatusId = 1,
                            Salary = 0,
                            Title = "React Junior Dev"
                        });
                });

            modelBuilder.Entity("Capstone.Models.Data.JobStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("JobStatus");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Status = "DreamJob"
                        },
                        new
                        {
                            Id = 2,
                            Status = "Applied"
                        },
                        new
                        {
                            Id = 3,
                            Status = "Interview"
                        },
                        new
                        {
                            Id = 4,
                            Status = "Rejected"
                        },
                        new
                        {
                            Id = 5,
                            Status = "Offer"
                        });
                });

            modelBuilder.Entity("Capstone.Models.Data.RefreshToken", b =>
                {
                    b.Property<Guid>("TokenId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Expires")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Invalidated")
                        .HasColumnType("bit");

                    b.Property<string>("JwtId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Used")
                        .HasColumnType("bit");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("TokenId");

                    b.HasIndex("UserId");

                    b.ToTable("RefreshToken");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Capstone.Models.Data.Comment", b =>
                {
                    b.HasOne("Capstone.Models.Data.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("ApplicationUserId");

                    b.HasOne("Capstone.Models.Data.Company", "Company")
                        .WithMany("Comments")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Capstone.Models.Data.Company", b =>
                {
                    b.HasOne("Capstone.Models.Data.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("ApplicationUserId");
                });

            modelBuilder.Entity("Capstone.Models.Data.CompanyType", b =>
                {
                    b.HasOne("Capstone.Models.Data.Company", "Company")
                        .WithMany("CompanyTypes")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Capstone.Models.Data.IndustryType", "IndustryType")
                        .WithMany()
                        .HasForeignKey("IndustryTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Capstone.Models.Data.Job", b =>
                {
                    b.HasOne("Capstone.Models.Data.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("ApplicationUserId");

                    b.HasOne("Capstone.Models.Data.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Capstone.Models.Data.JobStatus", "JobStatus")
                        .WithMany()
                        .HasForeignKey("JobStatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Capstone.Models.Data.RefreshToken", b =>
                {
                    b.HasOne("Capstone.Models.Data.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Capstone.Models.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Capstone.Models.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Capstone.Models.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Capstone.Models.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
