cmd_Release/binding.node := c++ -bundle -undefined dynamic_lookup -Wl,-search_paths_first -mmacosx-version-min=10.13 -arch x86_64 -L./Release -stdlib=libc++  -o Release/binding.node  
