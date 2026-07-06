package com.rohan.spring_boot_rest.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary){
        this.cloudinary = cloudinary;
    }

    public Map upload(MultipartFile file) throws IOException {
        return cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap("folder","job_portal/uploads")
        );
    }
    public Map updateImage(String publicId,MultipartFile file) throws IOException{
        Map<String,Object> params = new HashMap<>();
        params.put("public_id",publicId);
        params.put("overwrite",true);
        return cloudinary.uploader().upload(file.getBytes(),params);
    }

}
