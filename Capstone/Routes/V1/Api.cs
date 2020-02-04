using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Routes.V1
{
    public static class Api
    {
        internal const string Root = "api";
        internal const string Version = "v1";
        internal const string Base = Root + "/" + Version;

        public static class Values
        {
            public const string GetAll = Base + "/Values";
            public const string Get = Base + "/Values/{id}";
        }

        public static class Comments
        {
            public const string GetAll = Base + "/Comments";
            public const string Get = Base + "/Comments/{id}";
            public const string Post = Base + "/Comments";
            public const string Edit = Base + "/Comments/{id}";
            public const string Delete = Base + "/Comments/{id}";
            
        }

        public static class Jobs
        {
            public const string GetAll = Base + "/Jobs";
            public const string Get = Base + "/Jobs/{id}";
            public const string Post = Base + "/Jobs";
            public const string Edit = Base + "/Jobs/{id}";
            public const string Delete = Base + "/Jobs/{id}";
        }

        public static class Company
        {
            public const string GetAll = Base + "/Companies";
            public const string Get = Base + "/Companies/{id}";
            public const string Post = Base + "/Companies";
            public const string Edit = Base + "/Companies/{id}";
            public const string Delete = Base + "/Companies/{id}";
        }

        public static class User
        {
            public const string Login = Base + "/Auth/Login";
            public const string Register = Base + "/Auth/Register";
            public const string Refresh = Base + "/Auth/Refresh";
        }
    }
}
